import { log } from "logger";
import { UserDocument, UserQuery } from "graphql-codegen";
import client from "../graphql/apollo-client";

export default function Users({ userQuery }: { userQuery: UserQuery }) {
  log("Hey! This is Home.");
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Users</h1>
      <div className="flex">
        {userQuery.users?.map((user) => {
          return <div key={user?.id}>{user?.name}</div>;
        })}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const { data } = await client.query({
    query: UserDocument,
  });

  return {
    props: {
      userQuery: data,
    },
  };
}
