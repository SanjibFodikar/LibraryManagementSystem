from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from .models import *
from .serializers import *
from rest_framework import status

@api_view(['POST'])
def admin_login(request):
    username = request.data.get('username')
    password = request.data.get('password')
    try:
        user=authenticate(request, username=username, password=password)
        if user is not None:
            if user.is_staff:
                login(request, user)
                return Response({'message': 'Admin login successful', 'username': user.username},status=200)
            else:
                return Response({'error': 'You are not authorized to access this page'}, status=403)
    except Exception as e:
        return Response({'error': str(e)}, status=500)

@api_view(['POST'])
def addCategory(request):
    name = request.data.get('name')
    category_status = str(request.data.get('status',"1"))
    if not name:
        return Response({'error': 'Category name is required'}, status=400)
    if not category_status:
        return Response({'error': 'Category status is required'}, status=400)
    category = Category.objects.create(name=name, is_active=True if category_status == "1" else False)
    serializer = CategorySerializer(category)
    return Response({'message': 'Category added successfully', 'category': serializer.data}, status=201)

@api_view(['GET'])
def fetchCategories(request):       
    categories = Category.objects.all()
    serializer = CategorySerializer(categories, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK) 