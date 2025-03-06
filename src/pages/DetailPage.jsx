/* eslint-disable no-unused-vars */
import React from "react";
import { useOutletContext } from "react-router-dom";
import useGitHubData from "../Hooks/useGitHubUser";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import UserCard from "../components/UserCard";
import RepoList from "../components/RepoList";
import FollowerList from "../components/FollowerList";
import FollowingList from "../components/FollowingList";
import GistList from "../components/GistList";
import OrgList from "../components/OrgList";
import EventsList from "../components/EventsList";
import ReceivedEventsList from "../components/ReceivedEventsList";
import StarredList from "../components/StarredList";
import SubscriptionsList from "../components/SubscriptionsList";

const DetailPage = ({ detailKey }) => {
  const { username } = useOutletContext();
  const endpoint = detailKey;
  const { data, error, loading } = useGitHubData(username, endpoint);
  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;
  if (!data) return null;
  switch (detailKey) {
    case "overview":
      return <UserCard user={data} />;
    case "repos":
      if (Array.isArray(data)) return <RepoList repos={data} />;
      else return;
    case "followers":
      if (Array.isArray(data)) return <FollowerList followers={data} />;
      else return;
    case "following":
      if (Array.isArray(data)) return <FollowingList following={data} />;
      else return;
    case "gists":
      if (Array.isArray(data)) return <GistList gists={data} />;
      else return;
    case "orgs":
      if (Array.isArray(data)) return <OrgList orgs={data} />;
      else return;
    case "events":
      if (Array.isArray(data)) return <EventsList events={data} />;
      else return;
    case "received_events":
      if (Array.isArray(data)) return <ReceivedEventsList events={data} />;
      else return;
    case "starred":
      if (Array.isArray(data)) return <StarredList repos={data} />;
      else return;
    case "subscriptions":
      if (Array.isArray(data)) return <SubscriptionsList repos={data} />;
      else return;
    default:
      return <div>No data available.</div>;
  }
};

export default DetailPage;
