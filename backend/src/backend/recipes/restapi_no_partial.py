def restapi_no_partial():
    """Remove default partial update"""
    from rest_framework.mixins import UpdateModelMixin

    del UpdateModelMixin.partial_update
