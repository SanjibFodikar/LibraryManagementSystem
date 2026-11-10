from django.db import models

# Create your models here.

class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    class Meta:
        abstract = True


class Category(TimeStampedModel):
    name=models.CharField(max_length=100)
    is_active=models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Author(TimeStampedModel):
    name=models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Student(TimeStampedModel):
    student_id=models.CharField(max_length=20, unique=True)
    full_name=models.CharField(max_length=100)
    email=models.EmailField(unique=True)
    mobile=models.CharField(max_length=15, unique=True)
    password=models.CharField(max_length=100)
    is_active=models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Book(TimeStampedModel):
    title=models.CharField(max_length=200)
    author=models.ForeignKey(Author, on_delete=models.PROTECT)
    category=models.ForeignKey(Category, on_delete=models.PROTECT)
    isbn=models.CharField(max_length=20)
    price=models.DecimalField(max_digits=10, decimal_places=2)
    quantity=models.PositiveIntegerField(default=0)
    cover_image=models.ImageField(upload_to='book_covers/',blank=True, null=True)
    is_issued=models.BooleanField(default=False)

    def __str__(self):
        return self.title

class IssuedBook(TimeStampedModel):
    book=models.ForeignKey(Book, on_delete=models.CASCADE)
    student=models.ForeignKey(Student, on_delete=models.CASCADE)
    issued_at=models.DateTimeField(auto_now_add=True)
    return_date=models.DateTimeField(blank=True, null=True)
    is_returned=models.BooleanField(default=False)
    fine=models.PositiveIntegerField(default=0)
    remark=models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.book.title} issued to {self.student.full_name}"