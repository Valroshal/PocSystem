from django.http import HttpResponse
from rest_framework.decorators import permission_classes
from rest_framework.views import APIView
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from rest_framework import renderers
from backend.product.services.product_service import ProductService
from backend.user.services.user_service import UserService
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from backend.product.models.product import Product

import json

# Create your views here.
class ProductApi(APIView):
    renderer_classes = [renderers.JSONRenderer]

    def post(self, request):
        try:
            pr_id = request.data.get('pr_id')
            name = request.data.get('name')
            description = request.data.get('description')
            price = request.data.get('price')
            quantity = request.data.get('quantity')
            favorite = request.data.get('favorite')
            ProductService().create()

            print('successfully created')
            return Response(
                status=status.HTTP_200_OK
            )


        except ValidationError as ex:
            print('error', ex)
            return Response(
                data=str(ex),
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as ex:
            print('error', ex)
            return Response(
                data=str(ex),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def put(self, request):
        try:

            ProductService().update_favorite(
                product_id=request.data.get('id'),
                favorite=request.data.get('favorite'),
            )

            return Response(
                status=status.HTTP_200_OK
            )

        except ValidationError as ex:
            return Response(
                data=str(ex),
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as ex:
            return Response(
                data=str(ex),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def get(self, request):
        try:

            products = ProductService().get_all()

            if products is None:
                return Response(
                    data=[],
                    status=status.HTTP_204_NO_CONTENT
                )

            return Response(
                data=products,
                status=status.HTTP_200_OK
            )

        except ObjectDoesNotExist:
            return Response(
                status=status.HTTP_204_NO_CONTENT
            )
        except Exception as ex:
            return Response(
                data=str(ex),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def delete(self, request, pk):
        print('id', pk)
        # Retrieve the product ID from the request data or URL parameters
        # product_id = request.data.get('id')

        # Perform the deletion logic
        try:
            ProductService().delete_product(product_id=pk)

            return Response({'message': 'Product deleted successfully'})

        except ObjectDoesNotExist:
            return Response(
                status=status.HTTP_404_NOT_FOUND
            )
        except Exception as ex:
            return Response(
                data=str(ex),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class UserApi(APIView):

    def post(self, request):
        try:
            if request.method == 'POST':
                # Parse the JSON string
                data = json.loads(list(request.data.keys())[0])
                username = data.get('username')
                password = data.get('password')

                res = UserService().get_by_username(username=username, password=password)

                return Response(
                    status=200,
                    data={'token': res}
                    )

        except ObjectDoesNotExist:
            return Response(
                status=400,
                data={'error': 'Invalid credentials'}
            )
        except Exception as ex:
            return Response(
                data=str(ex),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @permission_classes([IsAuthenticated])
    def get(self, request):
        try:

            date = request.META.get('HTTP_IF_MODIFIED_SINCE')

            if not date:
                raise ValidationError('no date found')

            UserService().is_valid_token(date)

            return Response(
                status=status.HTTP_200_OK
            )

        except ObjectDoesNotExist:
            return Response(
                status=400,
                data={'error': 'Invalid credentials'}
            )
        except Exception as ex:
            return Response(
                data=str(ex),
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


        # return Response(status=status.HTTP_200_OK)


class HomeApi(APIView):
    def get(self, request):
        return HttpResponse("Welcome to the homepage!")
