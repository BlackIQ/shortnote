from django.db import models
from django.contrib.auth.models import User

class Shortnote(models.Model):
    STATUS = (
        ('important', 'important'),
        ('warning', 'warning'),
        ('note', 'note')
    )
    text     = models.CharField(max_length=1000, blank=False, null=False)
    status   = models.CharField(max_length=1000, blank=False, null=False, choices=STATUS, default='')
    creation = models.DateTimeField(auto_now_add=True, blank=False, null=False)
    user     = models.ForeignKey(User, on_delete=models.CASCADE)

    def color(self):
        if self.status == 'important':
            return 'danger'
        elif self.status == 'warning':
            return 'warning'
        else:
            return 'primary'
    def content(self):
        if self.status == 'important':
            return '<i class="fad fa-exclamation-circle"></i>'
        elif self.status == 'warning':
            return '<i class="fad fa-exclamation-circle"></i>'
        else:
            return ''

    def __str__(self):
        return self.text