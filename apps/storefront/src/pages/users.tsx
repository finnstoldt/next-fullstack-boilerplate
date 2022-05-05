import { log } from "logger";
import { useUserQuery } from "graphql-codegen";

export default function Users() {
  log("Hey! This is Home.");

  const { data } = useUserQuery();

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Users</h1>
      <div className="flex">
        {data &&
          data.users?.map((user) => {
            return <div key={user?.id}>{user?.name}</div>;
          })}
      </div>
    </div>
  );
}
