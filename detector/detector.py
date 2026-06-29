import json
import random
import time

while True:

    data = {
        "packets": random.randint(100, 300),
        "clients": random.randint(5, 20),
        "rogueAPs": random.randint(0, 3)
    }

    print(json.dumps(data), flush=True)

    time.sleep(1)