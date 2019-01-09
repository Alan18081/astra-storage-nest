MICROSERVICES=(
    API
    AuthService
    UsersService
    ProjectsService
)

for i in ${MICROSERVICES[@]}; do
    cd ../${i}
    rm -rf node_modules
    yarn
    rm -rf dist
    yarn build
done