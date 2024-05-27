from django.db import models

# Create your models here.


class Menu(models.Model):
    name = models.CharField(max_length=255)
    price = models.FloatField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self) -> str:
        # return super().__str__()

        return f"{self.name} goes for ${self.price}"
