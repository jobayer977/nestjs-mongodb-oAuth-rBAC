export enum ENUM_USER_ROLE {
	Customer = 'Customer',
	Provider = 'Provider',
}

export enum UserType {
	'ADMIN' = 'ADMIN',
	'INDIVIDUAL' = 'INDIVIDUAL',
	'PUBLISHER' = 'PUBLISHER',
}
export enum UserRoles {
	'ADMIN' = 'ADMIN',
	'INDIVIDUAL' = 'INDIVIDUAL',
	'PUBLISHER' = 'PUBLISHER',
}

export enum Provider {
	GOOGLE = 'google',
	FACEBOOK = 'facebook',
	GITHUB = 'github',
	LOCAL = 'local',
}

export enum PublicationStatus {
	PENDING = 'PENDING',
	APPROVED = 'APPROVED',
	REJECTED = 'REJECTED',
	IN_REVIEW = 'IN_REVIEW',
}
export enum PublicationMemberRoles {
	ADMIN = 'ADMIN',
	MEMBER = 'MEMBER',
	CONTRIBUTOR = 'CONTRIBUTOR',
}

export enum ArticleStatus {
	PENDING = 'PENDING',
	APPROVED = 'APPROVED',
	REJECTED = 'REJECTED',
	IN_REVIEW = 'IN_REVIEW',
}

export enum ParticipantStatus {
	PENDING = 'PENDING',
	APPROVED = 'APPROVED',
	REJECTED = 'REJECTED',
}

export enum OrderStatus {
	PENDING = 'PENDING',
	APPROVED = 'APPROVED',
	COMPLETED = 'COMPLETED',
}

export enum PaymentStatus {
	PENDING = 'PENDING',
	SUCCESS = 'SUCCESS',
	FAILED = 'FAILED',
}

export enum TransactionType {
	DEBIT = 'DEBIT',
	CREDIT = 'CREDIT',
}

export enum PaymentType {
	ADMIN = 'ADMIN',
	AUTHOR = 'AUTHOR',
	PUBLISHER = 'PUBLISHER',
}
