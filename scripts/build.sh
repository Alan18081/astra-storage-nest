MICROSERVICES=(
    API
    AuthService
    UsersService
    ProjectsService
    EmailsService
)

for i in ${MICROSERVICES[@]}; do
    cd ../${i}
    rm -rf node_modules
    yarn
    rm -rf dist
    yarn build
done