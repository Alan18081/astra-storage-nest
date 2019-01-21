MICROSERVICES=(
    API
    AuthService
    UsersService
    ProjectsService
    DataService
    EmailsService
)

for i in ${MICROSERVICES[@]}; do
    cd ../${i}
    rm -rf node_modules
    yarn
    rm -rf dist
done