from rest_framework import generics
from .models import Movie, Rating, Watchlist
from .serializers import MovieSerializer, RatingSerializer, WatchlistSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
import random

class MovieList(generics.ListAPIView):
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer


class AddRating(generics.CreateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer


class AddToWatchlist(generics.CreateAPIView):
    queryset = Watchlist.objects.all()
    serializer_class = WatchlistSerializer

@api_view(["GET"])
def recommend_movie(request, user_id):
    ratings = Rating.objects.filter(user_id=user_id)

    if not ratings.exists():
        return Response({"message": "No ratings yet"})

    top_rating = ratings.order_by("-rating").first()
    top_genre = top_rating.movie.genre

    watched_ids = ratings.values_list("movie_id", flat=True)

    recommendations = Movie.objects.filter(
        genre=top_genre
    ).exclude(id__in=watched_ids)

    if recommendations.exists():
        movie = random.choice(recommendations)
        return Response({
            "title": movie.title,
            "genre": movie.genre
        })

    return Response({"message": "No recommendations"})