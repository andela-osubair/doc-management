-- Table: public."Roles"

-- DROP TABLE public."Roles";

CREATE TABLE public."Roles"
(
    id integer NOT NULL DEFAULT nextval('"Roles_id_seq"'::regclass),
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    CONSTRAINT "Roles_pkey" PRIMARY KEY (id),
    CONSTRAINT "Roles_title_key" UNIQUE (title)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."Roles"
    OWNER to postgres;

-- Table: public."Users"

-- DROP TABLE public."Users";

    CREATE TABLE public."Users"
    (
        id integer NOT NULL DEFAULT nextval('"Users_id_seq"'::regclass),
        name character varying(255) COLLATE pg_catalog."default" NOT NULL,
        username character varying(255) COLLATE pg_catalog."default" NOT NULL,
        email character varying(255) COLLATE pg_catalog."default" NOT NULL,
        password character varying(255) COLLATE pg_catalog."default" NOT NULL,
        "createdAt" timestamp with time zone NOT NULL,
        "updatedAt" timestamp with time zone NOT NULL,
        "roleId" integer,
        CONSTRAINT "Users_pkey" PRIMARY KEY (id),
        CONSTRAINT "Users_email_key" UNIQUE (email),
        CONSTRAINT "Users_username_key" UNIQUE (username),
        CONSTRAINT "Users_roleId_fkey" FOREIGN KEY ("roleId")
            REFERENCES public."Roles" (id) MATCH SIMPLE
            ON UPDATE CASCADE
            ON DELETE SET NULL
    )
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;

    ALTER TABLE public."Users"
        OWNER to postgres;

        -- Table: public."Documents"

        -- DROP TABLE public."Documents";
CREATE TABLE public."Documents"
(
    id integer NOT NULL DEFAULT nextval('"Documents_id_seq"'::regclass),
    title character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "docContent" text COLLATE pg_catalog."default",
    "docType" character varying(255) COLLATE pg_catalog."default",
    "viewAccess" "enum_Documents_viewAccess" DEFAULT 'public'::"enum_Documents_viewAccess",
    role character varying(255) COLLATE pg_catalog."default" NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer,
    CONSTRAINT "Documents_pkey" PRIMARY KEY (id),
    CONSTRAINT "Documents_title_key" UNIQUE (title),
    CONSTRAINT "Documents_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES public."Users" (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public."Documents"
    OWNER to postgres;


-- Table: public."Shareds"

    -- DROP TABLE public."Shareds";

    CREATE TABLE public."Shareds"
    (
        id integer NOT NULL DEFAULT nextval('"Shareds_id_seq"'::regclass),
        email character varying(255) COLLATE pg_catalog."default" NOT NULL,
        "canEdit" boolean DEFAULT false,
        "createdAt" timestamp with time zone NOT NULL,
        "updatedAt" timestamp with time zone NOT NULL,
        "documentId" integer,
        CONSTRAINT "Shareds_pkey" PRIMARY KEY (id),
        CONSTRAINT "Shareds_documentId_fkey" FOREIGN KEY ("documentId")
            REFERENCES public."Documents" (id) MATCH SIMPLE
            ON UPDATE CASCADE
            ON DELETE SET NULL
    )
    WITH (
        OIDS = FALSE
    )
    TABLESPACE pg_default;

    ALTER TABLE public."Shareds"
        OWNER to postgres;
