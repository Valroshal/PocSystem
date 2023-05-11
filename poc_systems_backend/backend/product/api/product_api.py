from rest_framework.views import APIView
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from rest_framework import status
from rest_framework.response import Response

from backend.product.services.product_service import ProductService


class ProductApi(APIView):

    def post(self, request):
        try:

            user_json = ProductService().update_favorite(
                product_id=request.data['id'],
                favorite=request.data['favorite'],
            )

            return Response(
                data=user_json.to_representation(),
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

            return Response(
                data=products.to_representation(),
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
