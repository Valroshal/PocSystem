from dataclasses import asdict

from django.shortcuts import render

from backend.user.serializers.user_json import UserJson
from backend.user.services.user_service import UserService


def info(request, user_id):
    user = __get_basic_info(user_id=user_id)

    return render(
        request=request,
        # template_name='user_info.html', #TODO
        context={
            'user': user.to_representation(),
        }
    )


def __get_basic_info(user_id: str):
    user: UserJson = UserService().get_by_email(
        user_id=user_id
    )

    return user
