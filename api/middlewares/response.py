

def custom_response_success(data):
    return {
        "status": "ok",
        "status_code": 200,
        "data": data
    }

def custom_response_error(message, status_code):
    return {
        "status": "error",
        "status_code": status_code,
        "message": message
    }


