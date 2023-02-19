PYTHON_VERSION=py311

format: ## Format codes
	poetry run autoflake --in-place --remove-unused-variables --remove-all-unused-imports --recursive .
	poetry run isort .
	poetry run black -t ${PYTHON_VERSION} --line-length 119 .