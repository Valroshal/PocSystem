from rest_framework.views import APIView
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth import authenticate

from backend.product.services.product_service import ProductService
from backend.user.services.user_service import UserService


# Create your views here.
class ProductApi(APIView):

    def put(self, request):
        try:

            ProductService().update_favorite(
                product_id=request.data['id'],
                favorite=request.data['favorite'],
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
                    status=status.HTTP_200_OK
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


class UserApi(APIView):

    def post(self, request):
        try:
            if request.method == 'POST':
                email = request.POST['email']
                password = request.POST['password']

                # Use authenticate() to check the user's credentials
                user = authenticate(request, email=email, password=password)

                if user is not None:
                    # User exists with the provided credentials
                    # Perform additional actions or redirect to a success page
                    return Response(
                        status=status.HTTP_200_OK
                    )
                else:
                    # Invalid credentials or user does not exist
                    return Response(
                        status=status.HTTP_204_NO_CONTENT
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
