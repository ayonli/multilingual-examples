# Python Coding Instructions

## Variables

- Use descriptive variable names that clearly indicate their purpose
- Use `Final` from `typing` for constants that should never change
- Prefer immutable data structures (tuples, frozensets) over mutable ones when data shouldn't change
- Prefix unused variables with `_` to indicate intentional omission, e.g., `for _, value in items`
- Use `_0`, `_1`, etc. for unused elements when unpacking tuples with multiple consecutive unused elements
- Use snake_case for all variable names, following PEP 8 conventions

## Functions

- Use `def` for function declarations, avoid lambda for anything beyond simple one-liners
- All functions should have type hints for parameters and return types
- Functions should not have more than 4 parameters; use dataclasses or TypedDict for complex parameter groups
- Use `*args` and `**kwargs` sparingly, prefer explicit parameters when possible
- Keep function bodies small and focused, extract helper functions when needed but keep them close to their callers
- Use `@staticmethod` or `@classmethod` appropriately, prefer module-level functions over class methods when state isn't needed

## Types

- Always use type hints for better code clarity and tooling support
- Prefer `dataclass` for structured data over plain dictionaries
- Use `TypedDict` for dictionary shapes that need to be typed
- Use `Protocol` for structural typing instead of abstract base classes when duck typing is appropriate
- Prefer `list[T]`, `dict[K, V]`, `set[T]` (Python 3.9+) over `List[T]`, `Dict[K, V]`, `Set[T]` from typing
- Use `typing.Optional[T]` or `T | None` (Python 3.10+) explicitly for nullable types
- Use new generic syntax since Python 3.12, generic types should have bound constraints when necessary
- Avoid using `Any` type, prefer more specific types
- Use Pydantic for data validation and parsing, define models that serve as both runtime validators and type definitions
- Define custom exception classes inheriting from appropriate built-in exceptions for better error handling

## Modules

- Organize imports in three groups separated by blank lines: standard library, third-party, local modules
- Order imports alphabetically within each group
- Use absolute imports for clarity, relative imports only within packages when they improve readability
- Avoid star imports (`from module import *`), always import specific names

## Control Flows

- Prefer early returns to reduce nesting depth
- Use list/dict/set comprehensions for simple transformations, extract to functions for complex logic
- Prefer context managers (`with` statements) for resource management
- Use `match` statements (Python 3.10+) for pattern matching when handling multiple cases
- Handle exceptions specifically, avoid bare `except:` clauses
- Don't use exceptions for control flow, only for exceptional conditions
- Prefer `else` clauses on loops when checking if loop completed without break
- Use `asyncio` and `async`/`await` for I/O-bound concurrent operations
- Always await coroutines, never ignore them
- Don't raise exceptions in `finally` blocks
- When re-raising exceptions, use `raise ... from e` to preserve exception chain context
- Use exhaustiveness checking with `assert_never` from typing_extensions for type narrowing

## Safety

- Always using type hints for type safety
- Avoid deprecated or discouraged language features and APIs
- Prefer using `pydash.get` for safe list element access, only use direct indexing
  when the length of the list is checked beforehand
- Use `pathlib.Path` for safe path operations with proper validation
- Prefer immutable default arguments (None, empty tuple) over mutable ones (lists, dicts)
- Always try to write safe and secure code, learn and practice secure coding
  from Rust and other memory-safe languages

## Simplicity

- Naming conventions:
  - PascalCase for classes and exception types
  - snake_case for functions, methods, and variables
  - UPPER_SNAKE_CASE for module-level constants
  - snake_case for module/package names, use single words when possible
- Try to use shorter identifier names, but still meaningful and descriptive
- Don't write too many comments, let the code speak for itself, only add comments
  for complex logic, important decisions, and public APIs (with docstrings)

## Abstraction

- Extract repeated code into reusable functions or modules when possible
- Avoid over-engineering and premature abstractions, keep things simple and
  straightforward
- Prefer composition over inheritance, use protocols and dependency injection
  over class hierarchies
- Prefer small and focused functions and modules over large monolithic ones,
  consider breaking down large functions into smaller and testable helpers, but
  avoid over-modularization and keep related logic together, also keep helper
  functions close to their callers
- Avoid deep nesting of functions and modules, keep the structure flat and
  modular
- Construct modules with top level stateless functions, avoid classes, especially
  singletons when possible
- Construct business logic like we're writing libraries, try to avoid framework
  or environment lock-in

## Modernization

- Use Python 3.10+ features when available (match statements, union types with `|`,
  better error messages); use new generic syntax and type alias since 3.12
- Prefer f-strings over `.format()` or `%` formatting
- Use `pathlib.Path` instead of string paths
- Use dataclasses instead of manual `__init__` methods for data containers
- Use type hints consistently throughout codebase
- Follow PEP 8 style guide

## Workflow

- Ask for clarification when requirements are ambiguous or incomplete
- Write unit tests for critical and complex logic using `pytest`
- Follow existing code style and conventions in the project, but gradually modernize with
  these guidelines
- Look for and run formatting/linting tools after editing:
  - `ruff check --fix <file>` and `ruff format <file>` for linting and formatting
  - `pyrefly check <file>` for type checking
- Extract frequently used commands into scripts or Makefile for future reuse
- Write meaningful but brief commit messages describing the changes made
