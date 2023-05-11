from dataclasses import asdict

from django.shortcuts import render

from backend.product.serializers.product_json import ProductJson
from backend.product.services.product_service import ProductService


def info(request, product_id):
    product = __get_basic_info(product_id=product_id)

    return render(
        request=request,
        # template_name='product_info.html', #TODO
        context={
            'product': product.to_representation(),
        }
    )


def __get_basic_info(product_id: str):
    product: ProductJson = ProductService().get_by_id(
        product_id=product_id
    )

    return product
