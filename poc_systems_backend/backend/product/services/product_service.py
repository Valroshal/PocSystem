import decimal

from django.core.exceptions import ObjectDoesNotExist, ValidationError
from django.db import transaction

from backend.product.models.product import Product
from backend.product.serializers.product_json import ProductJson
from backend.core.base_manager import BaseManager



class ProductService(BaseManager):
    def __init__(self):
        try:
            super().__init__(model=Product)
        except Exception as ex:
            raise ex

    def update_favorite(
            self,
            favorite: bool,
            product_id: str,
    ):
        try:
            print("updating product with id", id)
            if favorite is None:
                raise ValidationError('favorite value not found')

            if not product_id:
                raise ValidationError('product_id not found')

            super().update(
                model_id=product_id,
                favorite=favorite,
            )
            print("Product service: updated item", product_id)

        except Exception as ex:
            raise ex

    def get_by_id(
            self,
            product_id,
    ):
        try:
            product = super().get_by_id(model_id=product_id)

            if not product:
                raise ObjectDoesNotExist

            product_json = ProductJson.from_model(product)

            return product_json

        except ObjectDoesNotExist:
            return None
        except Exception as ex:
            raise ex

    def get_all(self):
        try:

            products = Product.objects.all()

            if not products:
                raise ObjectDoesNotExist

            products_res = []

            for pr in products:
                pr_json: ProductJson = ProductJson(
                    id=pr.id,
                    name=pr.name,
                    description=pr.description,
                    price=pr.price,
                    quantity=pr.quantity,
                    favorite=pr.favorite,
                )

                products_res.append(pr_json.to_representation())

            return products_res

        except ObjectDoesNotExist:
            return None
        except Exception as ex:
            raise ex

    def delete_product(self, product_id):
        try:
            if not product_id:
                raise ValidationError('product_id not found')

            print('product id', product_id)
            product = Product.objects.get(id=product_id)
            print('product', product)

            product.delete()

            print("Product service: deleted item", product_id)

        except ObjectDoesNotExist:
            return None
        except Exception as ex:
            raise ex
