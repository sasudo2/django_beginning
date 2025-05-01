from django.db import models

# Create your models here.
class task(models.Model):
    title = models.CharField(max_length = 100, blank = False)
    discription = models.CharField(max_length = 500, blank = True)
    date = models.DateTimeField()

    def __str__(self):
        return f"title: {self.title}, Date: {self.date}"
    