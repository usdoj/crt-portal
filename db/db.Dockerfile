FROM postgres:12.15-alpine
RUN apk update

# added for openssl vulnerability remediation
# https://dso.docker.com/packages/pkg:alpine/openssl
# https://dso.docker.com/cve/CVE-2023-2650

RUN apk add --update openssl && \
    rm -rf /var/cache/apk/*
RUN apk add gettext  # For envsubst

ARG analytics_password
ENV POSTGRES_ANALYTICS_PASSWORD $analytics_password

COPY db/build_analytics.sql /
RUN envsubst < build_analytics.sql > docker-entrypoint-initdb.d/build_analytics.sql
