# Inventory 
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copia solo il file di progetto
COPY ["Inventory.csproj", "./"]
RUN dotnet restore "./Inventory.csproj"

# Copia il resto dei file
COPY . .
RUN dotnet build "Inventory.csproj" -c Release -o /app/build
RUN dotnet publish "Inventory.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 5001
ENTRYPOINT ["dotnet", "Inventory.dll"]