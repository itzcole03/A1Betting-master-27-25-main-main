from backend.main import app

def test_fastapi_app_exists():
    """Test that FastAPI app is properly initialized."""
    assert app is not None, "FastAPI app is None"
    assert hasattr(app, "title"), "FastAPI app missing 'title' attribute"
    assert (
        app.title == "A1Betting Ultra-Enhanced Backend"
    ), f"Unexpected app title: {app.title}"


def test_app_routes():
    routes = [route.path for route in app.routes]
    assert "/features" in routes, "'/features' route missing"
    assert "/predict" in routes, "'/predict' route missing"
    # The '/feature-flag-enabled' route was part of an older design and has been removed.
    # assert "/feature-flag-enabled" in routes, "'/feature-flag-enabled' route missing"


def test_root_endpoint(): 