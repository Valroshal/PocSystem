import logging

from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.db import transaction


from backend.core.base_manager import BaseManager
from backend.user.serializers.user_json import UserJson

logger = logging.getLogger(__name__)


class UserService(BaseManager):
    def __init__(self):
        try:
            super().__init__(model=User)
        except Exception as ex:
            logger.error(str(ex), exc_info=True)
            raise ex

    def get_by_email(
            self,
            email: str,
            password: str,
    ) -> [UserJson, None]:
        try:
            if email is None:
                raise ValidationError('email is empty')

            if password is None:
                raise ValidationError('password is empty')

            # TODO here user is empty, can't understand what's the problem
            # user = self.get(
            #     filters=Q(Q(email=email) & Q(password=password)),
            # ).all()

            user = User.objects.get(email=email, password=password)

            if not user:
                raise ValidationError('user does not exist')

            return UserJson.from_model(user)

        except ObjectDoesNotExist:
            return None
        except Exception as ex:
            logger.error(str(ex), exc_info=True)
            raise ex
