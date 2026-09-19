FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY asp.netcorewebapi/asp.netcorewebapi/*.csproj ./asp.netcorewebapi/asp.netcorewebapi/
RUN dotnet restore ./asp.netcorewebapi/asp.netcorewebapi/eye_disease.csproj
COPY asp.netcorewebapi/asp.netcorewebapi/ ./asp.netcorewebapi/asp.netcorewebapi/
RUN dotnet publish ./asp.netcorewebapi/asp.netcorewebapi/eye_disease.csproj -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "eye_disease.dll"]