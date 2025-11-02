class Greeting:
    def __init__(self, name: str):
        self.name = name

    def say_hello(self):
        return f"Hello, {self.name}!"


if __name__ == "__main__":
    greeter = Greeting("World")
    text = greeter.say_hello()
    print(text)
