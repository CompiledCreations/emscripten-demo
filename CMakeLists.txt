cmake_minimum_required(VERSION 3.10.0)
project(EmscriptenDemo VERSION 1.0.0)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)

file(GLOB_RECURSE DEMO_SOURCES CMAKE_CONFIGURE_DEPENDS "${CMAKE_CURRENT_SOURCE_DIR}/src/*.cpp")

set(LINK_FLAGS "${LINK_FLAGS_DEBUG} --bind -fwasm-exceptions")

add_executable(EmscriptenDemo ${DEMO_SOURCES})

set_target_properties(EmscriptenDemo PROPERTIES LINK_FLAGS "${LINK_FLAGS}  -Wl,--export=__cpp_exception -s MODULARIZE -s EXPORT_ES6=1 -s EXPORT_NAME='EmscriptenDemo'")