FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY Stockya.Api/Stockya.Api.csproj Stockya.Api/
COPY Stockya.Api/appsettings.json Stockya.Api/
COPY Stockya.Api/appsettings.Development.json Stockya.Api/
RUN dotnet restore Stockya.Api/Stockya.Api.csproj

COPY . .
WORKDIR /src/Stockya.Api
RUN dotnet publish -c Release -o /app/out

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app
COPY --from=build /app/out .
ENTRYPOINT [ "dotnet", "Stockya.Api.dll" ]