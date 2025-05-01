from django.shortcuts import render
from django.http import JsonResponse
import requests
import os
from dotenv import load_dotenv

load_dotenv()
# Create your views here.
def index(request):
    return render(request, 'weather/index.html')

def location(request, location):
    api = os.environ.get('WEATHER_API')
    print(f'{api}')
    url = f"http://api.weatherapi.com/v1/current.json?key={api}&q={location}"

    try:
        response = requests.get(url)
        data = response.json()

        if response.status_code == 200:
            print(data)
            return JsonResponse(data)
        else:
            return JsonResponse({
                'error': 'Failed to fetch weather data',
                'details': data
            }, status=response.status_code)
        
    except Exception as e:
        return JsonResponse({'error': str(e)}, status = 500)