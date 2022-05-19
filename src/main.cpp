#include <emscripten/bind.h>
#include <iostream>
#include <string>

using namespace emscripten;
using std::cout;

std::string GetGreeting()
{
    return "Hello, World!";
}

void Hello()
{
    std::cout << GetGreeting() << "\n";
}


EMSCRIPTEN_BINDINGS(EmscriptenDemo) {
    function("hello", &Hello);
    function("getGreeting", &GetGreeting);
}
