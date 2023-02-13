from django.urls import path

from . import views

urlpatterns = [
    path('', views.ListDaily.as_view()),
    path('<int:pk>/', views.DetailDaily.as_view()),
    path('<str:cat>/', views.CategoryDaily.as_view()),
]