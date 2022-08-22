declare type NostrEvent = {
  id?: string; //<32-bytes sha256 of the the serialized event data>
  pubkey: string; //<32-bytes hex-encoded public key of the event creator>,
  created_at: number; //<unix timestamp in seconds>,
  kind: number; //<integer>,
  tags: any[];
  content: string; //<arbitrary string>,
  sig?: string; //<64-bytes signature of the sha256 hash of the serialized event data, which is the same as the id field>
};

declare type Post = {
  title: string;
  contentType: "html" | "json";
  content: any;
};

declare type PostStructure = {
  title: string;
  createdAt: Date;
  content: string;
  authorId: string;
};
