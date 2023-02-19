from django.db import models


class Daily(models.Model):
    date = models.DateField(primary_key=True)
    weight = models.DecimalField(max_digits=5, decimal_places=2)
    section = models.ForeignKey("Macho", on_delete=models.PROTECT)
    isOpen = models.BooleanField(default=True)

    def __str__(self):
        date_str = self.date.strftime("%Y/%m/%d")
        return date_str


class Macho(models.Model):
    section = models.CharField(max_length=255)

    def __str__(self):
        return self.section
