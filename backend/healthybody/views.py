from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Daily, Macho
from .serializer import DailySerializer, MachoSerializer


class DailyListAPIView(generics.ListAPIView):
    queryset = Daily.objects.all()
    serializer_class = DailySerializer


class CreateDaily(APIView):
    def post(self, request):
        serializer = DailySerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        return Response(status.HTTP_500_INTERNAL_SERVER_ERROR)


class DetailDaily(APIView):
    def get(self, request, pk):
        try:
            try:
                daily = Daily.objects.get(date=pk)
                res = {
                    "date": daily.date,
                    "weight": daily.weight,
                    "section": daily.section.section,
                    "isOpen": daily.isOpen,
                }
                return Response(res)

            except:
                error_msg = f"no data with date = {pk} found"
                return Response(error_msg, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, pk):
        try:
            try:
                daily = Daily.objects.get(date=pk)
                serializer = DailySerializer(daily, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except:
                error_msg = f"no data with date = {pk} found"
                return Response(error_msg, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, pk):
        daily = Daily.objects.get(date=pk)
        daily.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class MachoListAPIView(generics.ListAPIView):
    queryset = Macho.objects.all()
    serializer_class = MachoSerializer


class DetailMacho(APIView):
    def get(self, request, pk):
        try:
            try:
                macho = Macho.objects.get(id=pk)
                res = {
                    "id": macho.id,
                    "section": macho.section,
                }
                return Response(res)

            except:
                error_msg = f"no data with id = {pk} found"
                return Response(error_msg, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def put(self, request, pk):
        try:
            try:
                macho = Macho.objects.get(id=pk)
                serializer = MachoSerializer(macho, data=request.data)
                if serializer.is_valid():
                    serializer.save()
                    return Response(serializer.data)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            except:
                error_msg = f"no data with id = {pk} found"
                return Response(error_msg, status=status.HTTP_404_NOT_FOUND)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def delete(self, request, pk):
        macho = Daily.objects.get(id=pk)
        macho.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class CreateMacho(APIView):
    def post(self, request):
        serializer = MachoSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status.HTTP_201_CREATED)
        return Response(status.HTTP_500_INTERNAL_SERVER_ERROR)


class CategoryDaily(APIView):
    _foreignkey_map = {"section": Macho}

    def get(self, request, cat):
        try:
            daily = Daily.objects.filter(isOpen=True).values_list("date", cat).order_by("-date")
            if cat in self._foreignkey_map:
                res_list = [
                    {
                        "date": d[0],
                        cat: self._foreignkey_map[cat].objects.get(id=d[1]).__dict__.get(cat),
                    }
                    for d in daily
                ]
            else:
                res_list = [
                    {
                        "date": d[0],
                        cat: d[1],
                    }
                    for d in daily
                ]
            return Response(res_list)
        except:
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
