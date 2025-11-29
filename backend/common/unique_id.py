import uuid


class UniqueCode:
    def generate_order_unique_code(order_type: str) -> str:
        """
        Generate a unique code using order_type, date, and a random suffix.

        Args:
            order_type (str): Order Type (e.g. TableBasedOrder, )
            date (str): Date in YYYYMMDD format

        Returns:
            str: A unique code like NAME-TYPE-DATE-ABC123
        """
        unique_suffix = str(uuid.uuid4()).split('-')[0].upper()
        return f"{order_type}-{unique_suffix}"
