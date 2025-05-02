from django.db import models

# Create your models here.
class blog(models.Model):
    title = models.CharField(max_length = 100, blank = False)
    content = models.CharField(max_length = 2000, blank = False)
    image = models.ImageField(upload_to = 'blog_images/', blank = True)
    date = models.DateField(auto_now_add = True)
    author = models.CharField(max_length = 50, blank = False)
    def __str__(self):
        return f"Title:{self.title}"