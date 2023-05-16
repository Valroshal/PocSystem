import logging

from django.contrib.auth.models import User
from rest_framework import status, request
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from django.contrib.auth import authenticate

from django.core.exceptions import ValidationError, ObjectDoesNotExist

from backend.core.base_manager import BaseManager

from datetime import datetime
logger = logging.getLogger(__name__)


class UserService(BaseManager):
    def __init__(self):
        try:
            super().__init__(model=User)
        except Exception as ex:
            logger.error(str(ex), exc_info=True)
            raise ex

    def get_by_username(
            self,
            username: str,
            password: str,
    ):
        try:
            if username is None:
                raise ValidationError('username is empty')

            if password is None:
                raise ValidationError('password is empty')

            # Use authenticate() to check the user's credentials
            user = authenticate(request, username=username, password=password)
            print('in service authenticated', user.is_authenticated, 'active', user.is_active)
            if user is not None:
                # User exists with the provided credentials
                token, _ = Token.objects.get_or_create(user=user)
                return token.key
                # return Response({'token': token.key})

            else:
                # Invalid credentials or user does not exist
                return Response(
                    status=400,
                    data={'error': 'Invalid credentials'}
                )

        except ObjectDoesNotExist:
            return None
        except Exception as ex:
            logger.error(str(ex), exc_info=True)
            raise ex

    def is_valid_token(self, date):
        try:

            datetime_token = datetime.strptime(date, "%a, %d %b %Y %H:%M:%S %Z")

            current_datetime = datetime.now()
            # print('current_datetime', current_datetime)
            # print('datetime_token', datetime_token)
            diff = current_datetime - datetime_token
            # print('diff', diff.total_seconds())

            hours_24 = 24 * 60 * 60

            if diff.total_seconds() > hours_24:
                return Response(
                    {'detail': 'Token has expired'},
                    status=status.HTTP_401_UNAUTHORIZED
                )

            return Response(status=status.HTTP_200_OK)

        except ObjectDoesNotExist:
            return None
        except Exception as ex:
            logger.error(str(ex), exc_info=True)
            raise ex
