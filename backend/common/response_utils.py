def generate_response(status_code:int, message:str, success:bool, data:dict=None) -> dict:
    return {
        "status_code": status_code,
        "message": message,
        "data": data if data else [],
        "success": success,
    }
