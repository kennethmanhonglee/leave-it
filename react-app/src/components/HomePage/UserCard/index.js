import styles from "./UserCard.module.css";

const UserCard = ({ user, petsCount }) => {
  return (
    <div className={styles.container}>
      <div className={styles.user_card}>
        <h1>
          {user.firstname} {user.lastname}
        </h1>
        <p>email: {user.email}</p>
        <p>pets: {petsCount}</p>
      </div>
    </div>
  );
};

export default UserCard;
