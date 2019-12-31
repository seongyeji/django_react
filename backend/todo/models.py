from django.db import models

class Todo (models.Model):
    id = models.AutoField(primary_key=True)
    context = models.TextField()
    # is_closed = models.BooleanField(blank=False, default=False)
    created_at = models.DateTimeField(auto_now_add=True)