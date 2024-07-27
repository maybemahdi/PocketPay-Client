import { useQuery } from "react-query";
import useAuth from "../Hooks/useAuth";
import useAxiosCommon from "../Hooks/useAxiosCommon";
import Loading from "../Components/Loading";
import useRole from "../Hooks/useRole";

const Transactions = () => {
  const axiosCommon = useAxiosCommon();
  const { role, isLoading: roleLoading } = useRole();
  const { currentUser, isLoading: userLoading } = useAuth();
  const { data: transactions, isLoading } = useQuery({
    queryKey: ["transactions", currentUser],
    queryFn: async () => {
      const { data } = await axiosCommon.get(
        `/transactions/${currentUser?.phone}`
      );
      return data;
    },
  });
  if (isLoading || userLoading || roleLoading) return <Loading />;
  return (
    <div
      style={{ minHeight: "calc(100vh - 150px)" }}
      className="mb-5 flex flex-col items-center justify-center"
    >
      {transactions?.length > 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 mb-5">
          <h3 className="text-rose-500 font-bold text-3xl text-center">
            Your Transaction History
          </h3>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 mb-5">
          <h3 className="text-rose-500 font-bold text-3xl text-center">
            No Transaction History Found
          </h3>
        </div>
      )}
      {transactions?.length > 0 && (
        <div className="overflow-x-auto mt-5 w-3/4 mx-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Type</th>
                <th>Date</th>
                <th>Time</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Amount</th>
                <th>Fee</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.length > 10 &&
                role !== "agent" &&
                transactions?.slice(0, 10).map((tr, idx) => (
                  <tr className="text-rose-500 font-semibold" key={idx}>
                    <th>{idx + 1}</th>
                    <td>{tr?.type}</td>
                    <td>
                      {new Date(tr?.timestamp).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td>
                      {new Date(tr?.timestamp)
                        .toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })
                        .toLowerCase()}
                    </td>
                    <td>
                      {tr?.sender === currentUser?.phone ? "You" : tr?.sender}
                    </td>
                    <td>
                      {tr?.accountNumber === currentUser?.phone
                        ? "You"
                        : tr?.accountNumber}
                    </td>
                    <td>{tr?.amount.toFixed(2)} BDT</td>
                    <td>{tr?.fee.toFixed(2)} BDT</td>
                    <td>{tr?.totalPayAmount.toFixed(2)} BDT</td>
                  </tr>
                ))}
              {transactions?.length < 10 &&
                role !== "agent" &&
                transactions?.map((tr, idx) => (
                  <tr className="text-rose-500 font-semibold" key={idx}>
                    <th>{idx + 1}</th>
                    <td>{tr?.type}</td>
                    <td>
                      {new Date(tr?.timestamp).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td>
                      {new Date(tr?.timestamp)
                        .toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })
                        .toLowerCase()}
                    </td>
                    <td>
                      {tr?.sender === currentUser?.phone ? "You" : tr?.sender}
                    </td>
                    <td>
                      {tr?.accountNumber === currentUser?.phone
                        ? "You"
                        : tr?.accountNumber}
                    </td>
                    <td>{tr?.amount.toFixed(2)} BDT</td>
                    <td>{tr?.fee.toFixed(2)} BDT</td>
                    <td>{tr?.totalPayAmount.toFixed(2)} BDT</td>
                  </tr>
                ))}
              {transactions?.length > 20 &&
                role === "agent" &&
                transactions?.slice(0, 20).map((tr, idx) => (
                  <tr className="text-rose-500 font-semibold" key={idx}>
                    <th>{idx + 1}</th>
                    <td>{tr?.type}</td>
                    <td>
                      {new Date(tr?.timestamp).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td>
                      {new Date(tr?.timestamp)
                        .toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })
                        .toLowerCase()}
                    </td>
                    <td>
                      {tr?.sender === currentUser?.phone ? "You" : tr?.sender}
                    </td>
                    <td>
                      {tr?.accountNumber === currentUser?.phone
                        ? "You"
                        : tr?.accountNumber}
                    </td>
                    <td>{tr?.amount.toFixed(2)} BDT</td>
                    <td>{tr?.fee.toFixed(2)} BDT</td>
                    <td>{tr?.totalPayAmount.toFixed(2)} BDT</td>
                  </tr>
                ))}
              {transactions?.length < 20 &&
                role === "agent" &&
                transactions?.map((tr, idx) => (
                  <tr className="text-rose-500 font-semibold" key={idx}>
                    <th>{idx + 1}</th>
                    <td>{tr?.type}</td>
                    <td>
                      {new Date(tr?.timestamp).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td>
                      {new Date(tr?.timestamp)
                        .toLocaleTimeString("en-US", {
                          hour: "numeric",
                          minute: "numeric",
                          hour12: true,
                        })
                        .toLowerCase()}
                    </td>
                    <td>
                      {tr?.sender === currentUser?.phone ? "You" : tr?.sender}
                    </td>
                    <td>
                      {tr?.accountNumber === currentUser?.phone
                        ? "You"
                        : tr?.accountNumber}
                    </td>
                    <td>{tr?.amount.toFixed(2)} BDT</td>
                    <td>{tr?.fee.toFixed(2)} BDT</td>
                    <td>{tr?.totalPayAmount.toFixed(2)} BDT</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Transactions;
