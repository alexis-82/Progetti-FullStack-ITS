FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copia solo il file di progetto
COPY ["Catalog.csproj", "./"]
RUN dotnet restore "./Catalog.csproj"

# Copia il resto dei file
COPY . .
RUN dotnet build "Catalog.csproj" -c Release -o /app/build
RUN dotnet publish "Catalog.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 5000
ENTRYPOINT ["dotnet", "Catalog.dll"]