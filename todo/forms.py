from django import forms
from .models import task

class TaskForm(forms.ModelForm):
    class Meta:
        model = task
        fields = ['title', 'discription', 'date']
        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-control', 'id': 'title', 'placeholder': 'Task title'}),
            'discription': forms.TextInput(attrs={'class': 'form-control', 'id': 'discription', 'placeholder': 'Task description'}),
            'date': forms.DateTimeInput(attrs={'class': 'form-control', 'id': 'datetime', 'type': 'datetime-local'}),
        }