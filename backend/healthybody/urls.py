from django.urls import path

from . import views

urlpatterns = [
    path("", views.DailyListAPIView.as_view()),
    path("daily/", views.CreateDaily.as_view()),
    path("daily/<str:pk>/", views.DetailDaily.as_view()),
    path("macho/", views.MachoListAPIView.as_view()),
    path("macho/<int:pk>/", views.DetailMacho.as_view()),
    path("macho_create/", views.CreateMacho.as_view()),
    path("category/<str:cat>", views.CategoryDaily.as_view()),
]
