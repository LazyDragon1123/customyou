FROM python:3.9

ENV PYTHONBUFFERED 1
ENV POETRY_VERSION=1.3.2

WORKDIR /app

RUN apt-get update && \
    apt-get install -y && \
    curl -sSL https://install.python-poetry.org | POETRY_VERSION=$POETRY_VERSION python3 -

ENV PATH $PATH:/root/.local/bin

COPY poetry.lock pyproject.toml ./

RUN poetry config virtualenvs.create false && \
    poetry install

COPY . /app

CMD python customu/manage.py runserver 0.0.0.0:8000