from django.db import models

# Create your models here.


class Element(models.Model):
    name = models.TextField()
    symbol = models.CharField(max_length=2)
    atomic_number = models.IntegerField()

    def __str__(self) -> str:
        # return super().__str__()

        return f"{self.name}:  [ {self.symbol} ]"
