from django.urls import path
from .views import MovieList, AddRating, AddToWatchlist, recommend_movie

urlpatterns = [
    path("movies/", MovieList.as_view()),
    path("rate/", AddRating.as_view()),
    path("watchlist/", AddToWatchlist.as_view()),
    path("recommend/<int:user_id>/", recommend_movie),
]