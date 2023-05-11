from rest_framework.views import APIView
from django.core.exceptions import ObjectDoesNotExist, ValidationError
from rest_framework import status
from rest_framework.response import Response

from backend.user.services.user_service import UserService


class UserApi(APIView):

    def get(self, request):
        try:

            user = UserService().get_by_email(
                email=request.data['email'],
                password=request.data['password'],
            )

            return Response(
                data=user.to_representation(),
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
