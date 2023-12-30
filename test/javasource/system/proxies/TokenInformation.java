// This file was generated by Mendix Studio Pro.
//
// WARNING: Code you write here will be lost the next time you deploy the project.

package system.proxies;

public class TokenInformation implements com.mendix.systemwideinterfaces.core.IEntityProxy
{
	private final com.mendix.systemwideinterfaces.core.IMendixObject tokenInformationMendixObject;

	private final com.mendix.systemwideinterfaces.core.IContext context;

	/**
	 * Internal name of this entity
	 */
	public static final java.lang.String entityName = "System.TokenInformation";

	/**
	 * Enum describing members of this entity
	 */
	public enum MemberNames
	{
		Token("Token"),
		ExpiryDate("ExpiryDate"),
		UserAgent("UserAgent"),
		TokenInformation_User("System.TokenInformation_User");

		private final java.lang.String metaName;

		MemberNames(java.lang.String s)
		{
			metaName = s;
		}

		@java.lang.Override
		public java.lang.String toString()
		{
			return metaName;
		}
	}

	public TokenInformation(com.mendix.systemwideinterfaces.core.IContext context)
	{
		this(context, com.mendix.core.Core.instantiate(context, entityName));
	}

	protected TokenInformation(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject tokenInformationMendixObject)
	{
		if (tokenInformationMendixObject == null) {
			throw new java.lang.IllegalArgumentException("The given object cannot be null.");
		}
		if (!com.mendix.core.Core.isSubClassOf(entityName, tokenInformationMendixObject.getType())) {
			throw new java.lang.IllegalArgumentException(String.format("The given object is not a %s", entityName));
		}	

		this.tokenInformationMendixObject = tokenInformationMendixObject;
		this.context = context;
	}

	/**
	 * Initialize a proxy using context (recommended). This context will be used for security checking when the get- and set-methods without context parameters are called.
	 * The get- and set-methods with context parameter should be used when for instance sudo access is necessary (IContext.createSudoClone() can be used to obtain sudo access).
	 * @param context The context to be used
	 * @param mendixObject The Mendix object for the new instance
	 * @return a new instance of this proxy class
	 */
	public static system.proxies.TokenInformation initialize(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixObject mendixObject)
	{
		return new system.proxies.TokenInformation(context, mendixObject);
	}

	public static system.proxies.TokenInformation load(com.mendix.systemwideinterfaces.core.IContext context, com.mendix.systemwideinterfaces.core.IMendixIdentifier mendixIdentifier) throws com.mendix.core.CoreException
	{
		com.mendix.systemwideinterfaces.core.IMendixObject mendixObject = com.mendix.core.Core.retrieveId(context, mendixIdentifier);
		return system.proxies.TokenInformation.initialize(context, mendixObject);
	}

	public static java.util.List<system.proxies.TokenInformation> load(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String xpathConstraint) throws com.mendix.core.CoreException
	{
		return com.mendix.core.Core.createXPathQuery(String.format("//%1$s%2$s", entityName, xpathConstraint))
			.execute(context)
			.stream()
			.map(obj -> system.proxies.TokenInformation.initialize(context, obj))
			.collect(java.util.stream.Collectors.toList());
	}

	/**
	 * Set value of Token
	 * @param token
	 */
	public final void setToken(java.lang.String token)
	{
		setToken(getContext(), token);
	}

	/**
	 * Set value of Token
	 * @param context
	 * @param token
	 */
	public final void setToken(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String token)
	{
		getMendixObject().setValue(context, MemberNames.Token.toString(), token);
	}

	/**
	 * @return value of ExpiryDate
	 */
	public final java.util.Date getExpiryDate()
	{
		return getExpiryDate(getContext());
	}

	/**
	 * @param context
	 * @return value of ExpiryDate
	 */
	public final java.util.Date getExpiryDate(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.util.Date) getMendixObject().getValue(context, MemberNames.ExpiryDate.toString());
	}

	/**
	 * Set value of ExpiryDate
	 * @param expirydate
	 */
	public final void setExpiryDate(java.util.Date expirydate)
	{
		setExpiryDate(getContext(), expirydate);
	}

	/**
	 * Set value of ExpiryDate
	 * @param context
	 * @param expirydate
	 */
	public final void setExpiryDate(com.mendix.systemwideinterfaces.core.IContext context, java.util.Date expirydate)
	{
		getMendixObject().setValue(context, MemberNames.ExpiryDate.toString(), expirydate);
	}

	/**
	 * @return value of UserAgent
	 */
	public final java.lang.String getUserAgent()
	{
		return getUserAgent(getContext());
	}

	/**
	 * @param context
	 * @return value of UserAgent
	 */
	public final java.lang.String getUserAgent(com.mendix.systemwideinterfaces.core.IContext context)
	{
		return (java.lang.String) getMendixObject().getValue(context, MemberNames.UserAgent.toString());
	}

	/**
	 * Set value of UserAgent
	 * @param useragent
	 */
	public final void setUserAgent(java.lang.String useragent)
	{
		setUserAgent(getContext(), useragent);
	}

	/**
	 * Set value of UserAgent
	 * @param context
	 * @param useragent
	 */
	public final void setUserAgent(com.mendix.systemwideinterfaces.core.IContext context, java.lang.String useragent)
	{
		getMendixObject().setValue(context, MemberNames.UserAgent.toString(), useragent);
	}

	/**
	 * @throws com.mendix.core.CoreException
	 * @return value of TokenInformation_User
	 */
	public final system.proxies.User getTokenInformation_User() throws com.mendix.core.CoreException
	{
		return getTokenInformation_User(getContext());
	}

	/**
	 * @param context
	 * @return value of TokenInformation_User
	 * @throws com.mendix.core.CoreException
	 */
	public final system.proxies.User getTokenInformation_User(com.mendix.systemwideinterfaces.core.IContext context) throws com.mendix.core.CoreException
	{
		system.proxies.User result = null;
		com.mendix.systemwideinterfaces.core.IMendixIdentifier identifier = getMendixObject().getValue(context, MemberNames.TokenInformation_User.toString());
		if (identifier != null) {
			result = system.proxies.User.load(context, identifier);
		}
		return result;
	}

	/**
	 * Set value of TokenInformation_User
	 * @param tokeninformation_user
	 */
	public final void setTokenInformation_User(system.proxies.User tokeninformation_user)
	{
		setTokenInformation_User(getContext(), tokeninformation_user);
	}

	/**
	 * Set value of TokenInformation_User
	 * @param context
	 * @param tokeninformation_user
	 */
	public final void setTokenInformation_User(com.mendix.systemwideinterfaces.core.IContext context, system.proxies.User tokeninformation_user)
	{
		if (tokeninformation_user == null) {
			getMendixObject().setValue(context, MemberNames.TokenInformation_User.toString(), null);
		} else {
			getMendixObject().setValue(context, MemberNames.TokenInformation_User.toString(), tokeninformation_user.getMendixObject().getId());
		}
	}

	@Override
	public final com.mendix.systemwideinterfaces.core.IMendixObject getMendixObject()
	{
		return tokenInformationMendixObject;
	}

	@Override
	public final com.mendix.systemwideinterfaces.core.IContext getContext()
	{
		return context;
	}

	@java.lang.Override
	public boolean equals(Object obj)
	{
		if (obj == this) {
			return true;
		}
		if (obj != null && getClass().equals(obj.getClass()))
		{
			final system.proxies.TokenInformation that = (system.proxies.TokenInformation) obj;
			return getMendixObject().equals(that.getMendixObject());
		}
		return false;
	}

	@java.lang.Override
	public int hashCode()
	{
		return getMendixObject().hashCode();
	}

  /**
   * Gives full name ("Module.Entity" name) of the type of the entity.
   *
   * @return the name
   */
	public static java.lang.String getType()
	{
		return entityName;
	}
}
